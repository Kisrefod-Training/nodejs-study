import HttpServer from './src/httpServerClass.js'; // eslint-disable-line import/extensions
import { Octokit } from "@octokit/rest";
import { owner, repo, token } from './src/config.js'; // eslint-disable-line import/extensions
const server = new HttpServer();
export default server;
/* // @ts-ignore
if (esMain(import.meta)) server.startServer(host, port).then(); */

async function getCollaborators() {
    const octokit = new Octokit({

    });

    /*const collaborators = await octokit.rest.repos.listCollaborators(owner, repo).then();
    console.log(collaborators[1]);*/
    const branches = await octokit.rest.repos.listBranches
}

getCollaborators();
