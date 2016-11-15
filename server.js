/*
 * @Author: accord
 * @Date:   2016-11-12 23:01:52
 * @Last Modified by:   accord
 * @Last Modified time: 2016-11-12 23:08:44
 */

'use strict';

import express from 'express';
import path from 'path';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
