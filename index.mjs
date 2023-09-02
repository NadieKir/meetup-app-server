import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
import { auth } from './auth.mjs';
import { loginRoutes } from './routers/login.mjs';
import { meetupsRoutes } from './routers/meetups.mjs';
import { usersRoutes } from './routers/users.mjs';
import { newsRoutes } from './routers/news.mjs';
import { votedUsersRoutes } from './routers/votedUsers.mjs';
import { initDataBase } from './initDataBase.mjs';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import cors from 'cors';

const swaggerDocument = YAML.load('./openapi.yaml');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({limit: '10mb'}));
app.use(
  bodyParser.urlencoded({
    limit: '10mb',
    extended: true,
    parameterLimit: 50000 
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: 'this is the default passphrase',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

const db = await initDataBase();

auth(db.data.users);

app.use(function (err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});

app.use('/api', loginRoutes);
app.use('/api/users', usersRoutes(db));
app.use('/api/meetups', meetupsRoutes(db));
app.use('/api/news', newsRoutes(db));
app.use('/api/votedusers', votedUsersRoutes(db));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(8080, () => {
  console.log('Api server is up.');
  console.log('listening on port 8080');
});
