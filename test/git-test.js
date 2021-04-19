import assert from 'assert';
import mockito, { anyString } from 'ts-mockito';
import GitParser from '../src/git-parser.js';
import { TestOctokit, correctParsedData } from './git-test-data.js';
describe('Github-data parsed correctly', () => {
    let checkingParsedData;
    before(done => {
        const gitParser = new GitParser();
        const spiedParser = mockito.spy(gitParser);
        // getAuthorizedOctokit get github-authToken (string)
        // and return interface for comfort web-requests.
        // For this tests was created substitute-interface TestOctokit with predefined returns.
        mockito.when(spiedParser.getAuthorizedOctokit(anyString())).thenReturn(TestOctokit);
        gitParser.getParsedData().then(result => {
            checkingParsedData = result;
            done();
        });
    });
    function getArraysDifference(a, b) {
        // Compare two arrays with the same length and return the difference
        if (a.length !== b.length)
            return false;
        return a.filter((item, index) => item !== b[index]);
    }
    it('Number of returned data blocks is correct', () => {
        assert.deepStrictEqual(0, 0);
        assert.deepStrictEqual(checkingParsedData.length, correctParsedData.length);
    });
    it('Number of returned PR is correct', () => {
        const checkingPRNum = checkingParsedData.filter(value => value.type === 'PR').length;
        const correctPRNum = correctParsedData.filter(value => value.type === 'PR').length;
        assert.deepStrictEqual(checkingPRNum, correctPRNum);
    });
    it('Number of returned commits is correct', () => {
        const checkingCommitNum = checkingParsedData.filter(value => value.type === 'commit').length;
        const correctCommitNum = correctParsedData.filter(value => value.type === 'commit').length;
        assert.deepStrictEqual(checkingCommitNum, correctCommitNum);
    });
    it('All usernames are correct', () => {
        const checkingUsernames = checkingParsedData.map(({ user }) => user);
        const correctUsernames = correctParsedData.map(({ user }) => user);
        assert.deepStrictEqual(getArraysDifference(checkingUsernames, correctUsernames), []);
    });
    it('All types are correct', () => {
        const checkingTypes = checkingParsedData.map(({ type }) => type);
        const correctTypes = correctParsedData.map(({ type }) => type);
        assert.deepStrictEqual(getArraysDifference(checkingTypes, correctTypes), []);
    });
    it('All URLs are correct', () => {
        const checkingURLs = checkingParsedData.map(({ URL }) => URL);
        const correctURLs = correctParsedData.map(({ URL }) => URL);
        assert.deepStrictEqual(getArraysDifference(checkingURLs, correctURLs), []);
    });
    it('All IDs are correct', () => {
        const checkingIDs = checkingParsedData.map(({ ID }) => ID);
        const correctIDs = correctParsedData.map(({ ID }) => ID);
        assert.deepStrictEqual(getArraysDifference(checkingIDs, correctIDs), []);
    });
});
