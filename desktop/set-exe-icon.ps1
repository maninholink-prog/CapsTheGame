param(
    [Parameter(Mandatory)][string]$Executable,
    [Parameter(Mandatory)][string]$Icon
)
$ErrorActionPreference = 'Stop'

if (-not ('CapsIconResource' -as [type])) {
    Add-Type @"
using System;
using System.Runtime.InteropServices;

public static class CapsIconResource {
    [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
    public static extern IntPtr BeginUpdateResource(string file, bool deleteExisting);

    [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
    public static extern bool UpdateResource(IntPtr handle, IntPtr type, IntPtr name, ushort language, byte[] data, uint size);

    [DllImport("kernel32.dll", CharSet=CharSet.Unicode, SetLastError=true)]
    public static extern bool EndUpdateResource(IntPtr handle, bool discard);
}
"@
}

$bytes = [IO.File]::ReadAllBytes((Resolve-Path -LiteralPath $Icon).Path)
$count = [BitConverter]::ToUInt16($bytes, 4)
if ([BitConverter]::ToUInt32($bytes, 0) -ne 65536 -or $count -eq 0 -or $bytes.Length -lt (6 + 16 * $count)) {
    throw 'Arquivo ICO inválido.'
}
$group = [byte[]]::new(6 + 14 * $count)
[Array]::Copy($bytes, $group, 6)

# The bundled Electron executable exposes group 1 in language 1033.
$handle = [CapsIconResource]::BeginUpdateResource((Resolve-Path -LiteralPath $Executable).Path, $false)
if ($handle -eq [IntPtr]::Zero) { throw [ComponentModel.Win32Exception]::new() }
$discard = $true
try {
    for ($i = 0; $i -lt $count; $i++) {
        $entry = 6 + 16 * $i
        $target = 6 + 14 * $i
        $id = 100 + $i
        $size = [BitConverter]::ToUInt32($bytes, $entry + 8)
        $offset = [BitConverter]::ToUInt32($bytes, $entry + 12)
        $image = [byte[]]::new($size)
        [Array]::Copy($bytes, $offset, $image, 0, $size)
        [Array]::Copy($bytes, $entry, $group, $target, 12)
        [Array]::Copy([BitConverter]::GetBytes([uint16]$id), 0, $group, $target + 12, 2)
        if (-not [CapsIconResource]::UpdateResource($handle, 3, $id, 1033, $image, $size)) {
            throw [ComponentModel.Win32Exception]::new()
        }
    }
    if (-not [CapsIconResource]::UpdateResource($handle, 14, 1, 1033, $group, $group.Length)) {
        throw [ComponentModel.Win32Exception]::new()
    }
    $discard = $false
} finally {
    if (-not [CapsIconResource]::EndUpdateResource($handle, $discard) -and -not $discard) {
        throw [ComponentModel.Win32Exception]::new()
    }
}
