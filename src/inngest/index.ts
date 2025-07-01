/**
 * This is the entrypoint for your Inngest functions.
 *
 * It's imported by the dev server and the Inngest platform.
 */
import { inngest } from './client';
import { server } from './functions';

export { inngest, server };
