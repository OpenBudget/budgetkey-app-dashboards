#!/usr/bin/env python
import json
import yaml
import glob

for f in glob.glob('src/app/configurations/*yaml'):
    print(f)
    data = json.dumps(yaml.load(open(f)),
                      indent=2, ensure_ascii=False, sort_keys=True)
    out = open(f.replace('.yaml', '.ts'), 'w')
    out.write('export const config = %s;' % data)
                
