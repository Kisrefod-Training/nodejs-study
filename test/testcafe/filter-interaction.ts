import { Selector } from 'testcafe';
import { parsedData } from '../test-data/view-test-data';

fixture`Filter works correctly`
    .page`127.0.0.1:1337`;

test('All data printed out', async t => {
    const expected = parsedData.length;

    await t
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
test('PRs printed out correctly', async t => {
    const expected = parsedData.filter(item => item.type === 'PR').length;

    await t
        .typeText('#filterInput', 'PR')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
test('Commits printed out correctly', async t => {
    const expected = parsedData.filter(item => item.type === 'commit').length;

    await t
        .typeText('#filterInput', 'commit')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
test('Filter is case-insensitive - \'a\' and \'A\' returns the same', async t => {
    const expected = parsedData.filter(item => item.user.toLowerCase().indexOf('a') !== -1
                || item.type.toLowerCase().indexOf('a') !== -1
                || item.URL.toLowerCase().indexOf('a') !== -1
                || item.ID.toLowerCase().indexOf('a') !== -1).length;

    await t
        .typeText('#filterInput', 'a')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected)
        .typeText('#filterInput', 'A', { replace: true })
        .expect(Selector('tbody tr').filterVisible().count)
        .eql(expected);
});
test('Filter is field-insensitive - \'b\' viewed in all fields', async t => {
    const expected = parsedData.filter(item => item.user.toLowerCase().indexOf('b') !== -1
            || item.type.toLowerCase().indexOf('b') !== -1
            || item.URL.toLowerCase().indexOf('b') !== -1
            || item.ID.toLowerCase().indexOf('b') !== -1).length;

    await t
        .typeText('#filterInput', 'b')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
test('Filter works correctly with requests of different lengths', async t => {
    const expected = parsedData.filter(item => item.user.toLowerCase().indexOf('aaa') !== -1
            || item.type.toLowerCase().indexOf('aaa') !== -1
            || item.URL.toLowerCase().indexOf('aaa') !== -1
            || item.ID.toLowerCase().indexOf('aaa') !== -1).length;

    await t
        .typeText('#filterInput', 'aAa')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
test('Filter works correctly with multi-word requests', async t => {
    const expected = parsedData.filter(item => item.user.toLowerCase().indexOf('two words') !== -1
            || item.type.toLowerCase().indexOf('two words') !== -1
            || item.URL.toLowerCase().indexOf('two words') !== -1
            || item.ID.toLowerCase().indexOf('two words') !== -1).length;

    await t
        .typeText('#filterInput', 'two words')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
test('Filter works correctly with null result requests', async t => {
    const expected = parsedData.filter(item => item.user.toLowerCase().indexOf('null') !== -1
            || item.type.toLowerCase().indexOf('null') !== -1
            || item.URL.toLowerCase().indexOf('null') !== -1
            || item.ID.toLowerCase().indexOf('null') !== -1).length;

    await t
        .typeText('#filterInput', 'null')
        .expect(Selector('tbody tr').filterVisible().count).eql(expected);
});
