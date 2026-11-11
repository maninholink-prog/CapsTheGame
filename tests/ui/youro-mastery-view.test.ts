import {expect,it} from 'vitest';
import {heroPortrait} from '../../src/ui/profile-view.js';
it('uses Youro’s original cat portrait in shared protagonist views',()=>{expect(heroPortrait('youro')).toContain('src="/art/youro.png"');});
