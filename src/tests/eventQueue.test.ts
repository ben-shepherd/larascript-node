import { afterAll, beforeAll, describe, test } from '@jest/globals';
import testAppConfig from '@src/config/test';
import Repository from '@src/core/base/Repository';
import Kernel from '@src/core/Kernel';
import MongoDBProvider from '@src/core/providers/MongoDBProvider';
import { App } from '@src/core/services/App';
import 'dotenv/config';
import TestQueueSubscriber from './events/subscribers/TestQueueSubscriber';
import { TestMovieModel } from './models/models/TestMovie';
import TestWorkerModel from './models/models/TestWorkerModel';
import TestConsoleProvider from './providers/TestConsoleProvider';
import TestEventProvider from './providers/TestEventProvider';

describe('mock event service', () => {
  const movieName = 'testMovie';
  let movie: TestMovieModel | null;

  /**
   * Setup MongoDB
   * Setup Kernel with test Console and Event provider
   */
  beforeAll(async () => {
    await Kernel.boot({
      ...testAppConfig,
      providers: [
        new MongoDBProvider(),
        new TestConsoleProvider(),
        new TestEventProvider()
      ]
    }, {});

    await App.container('mongodb').getDb()
      .collection(new TestWorkerModel().collection)
      .deleteMany({})
  });

  /**
   * After tests, check if the record was created
   * Clear out created records
   */
  afterAll(async () => {
    const repository = new Repository<TestMovieModel>('tests', TestMovieModel);
    movie = await repository.findOne({ name: movieName });
    expect(movie?.getId()).toBeTruthy();
    expect(movie?.getAttribute('name')).toBe(movieName);

    await movie?.delete();
    expect(movie?.data).toBeNull();
  });

  /**
   * Dispatches the TestQueueSubscriber event to the worker
   */
  test('dispatch a test event', (done) => {
    App.container('events').dispatch(new TestQueueSubscriber({ name: movieName }));
    done();
  });

  /**
   * Worker will run and create a record
   */
  test('run the worker command', async () => {
    await App.container('console').reader(['worker']).handle();
  });


});