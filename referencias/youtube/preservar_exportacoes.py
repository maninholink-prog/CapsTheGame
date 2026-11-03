"""Copia somente transcrições exportadas para os IDs do inventário local."""
from pathlib import Path
import csv, json, re, shutil, sys

root = Path(__file__).resolve().parent
source = Path(sys.argv[1])
with (root / 'videos.tsv').open(encoding='utf-8') as f:
    videos = list(csv.DictReader(f, delimiter='\t'))
allowed = {v['id'] for v in videos}
dest = root / 'transcricoes'
dest.mkdir(exist_ok=True)
for p in source.glob('youtube-*.txt'):
    text = p.read_text(encoding='utf-8-sig')
    match = re.search(r'Video ID: ([\w-]+)', text)
    if match and match.group(1) in allowed and re.search(r'^\[\d+:', text, re.M):
        shutil.copyfile(p, dest / (match.group(1) + '.txt'))
status = []
for v in videos:
    p = dest / (v['id'] + '.txt')
    text = p.read_text(encoding='utf-8-sig') if p.exists() else ''
    segments = re.findall(r'^\[([\d:]+)\]', text, re.M)
    truncated = '[Transcript truncated]' in text
    status.append({**v, 'url': 'https://www.youtube.com/watch?v=' + v['id'],
                   'arquivo': str(p.relative_to(root)), 'segmentos': len(segments),
                   'ultimo_timestamp': segments[-1] if segments else None,
                   'truncada': truncated,
                   'status': ('transcricao_parcial_leitura_pendente' if truncated else 'transcricao_preservada_leitura_pendente') if segments else 'sem_transcricao_acessivel'})
(root / 'inventario.json').write_text(json.dumps(status, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'total':len(status),'preservadas':sum(bool(v['segmentos']) for v in status)}, ensure_ascii=False))
