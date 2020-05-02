import { Injectable } from '@angular/core';

/* --- local dependencies -- */
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IUserDetails } from 'src/app/shared/interfaces/IUserDetails';
import { INews } from 'src/app/shared/interfaces/INews';

/**
 * Service for creating in memory db instances
 */
@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    // instance created for login purpose
    const userDetails: IUserDetails[] = [
      {
        id: 1,
        username: 'nitish',
        email: 'nitish@gmail.com',
        password: 'nitish',
      },
      {
        id: 2,
        username: 'Tarun',
        email: 'tarun@gmail.com',
        password: 'tarun',
      },
    ];

    // instance created for storing and getting news details
    const newsDetails: INews[] = [
      {
        id: 1,
        title: 'Covid 19 precautions',
        summary: 'Precautions is the only way to stop spreading',
        description:
          'Few things that should be done in order to stay safe from the Cronavirus',
        fullArticle:
          'Clean your hands often. Use soap and water, or an alcohol-based hand rub, ' +
          'Maintain a safe distance from anyone who is coughing or sneezing, ' +
          'Don’t touch your eyes, nose or mouth, Cover your nose and mouth with your bent elbow or a tissue when you cough or sneeze, ' +
          'Stay home if you feel unwell,If you have a fever, a cough, and difficulty breathing, seek medical attention. Call in advance, ' +
          'Follow the directions of your local health authority',
      },
    ];
    return { userDetails, newsDetails };
  }

  /** Method that generates the ids of user | news when not passed. */
  genId<T extends IUserDetails | INews>(details: T[]): number {
    return details.length > 0
      ? Math.max(...details.map((data) => data.id)) + 1
      : 1;
  }
}
