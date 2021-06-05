/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';


 describe('pushToHistory', () => {
     test('settings', () => {
         expect(pushToHistory("settings",1).state).toEqual({ page: 'settings' });
     });
     test('entry', () => {
         expect(pushToHistory("entry",1).state).toEqual({ page: `entry1` });
     });
     test('default', () => {
         expect(pushToHistory("whatever",1).state).toEqual({});
     });
 });
 