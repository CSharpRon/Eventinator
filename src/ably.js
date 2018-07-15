import { Realtime } from 'ably/browser/static/ably-commonjs.js';
import {KEY} from './events/account';​

window.Ably = new Realtime(KEY);