import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../src/worker.mjs',import.meta.url),'utf8');
function namesFromArray(constName){
  const marker=`const ${constName} = [`;
  const start=source.indexOf(marker);
  assert.notEqual(start,-1,`${constName} missing`);
  const end=source.indexOf('];',start);
  const text=source.slice(start+marker.length,end);
  return [...text.matchAll(/\["([^"]+)"/g)].map(m=>m[1]);
}
test('all 150 calibrated drinks have fixed D1 copy',()=>{
  const master=[...new Set(namesFromArray('DRINK_MASTER_SEED'))];
  const copy=new Set(namesFromArray('DRINK_COPY_SEED'));
  assert.equal(master.length,150);
  const missing=master.filter(name=>!copy.has(name));
  assert.deepEqual(missing,[]);
});
