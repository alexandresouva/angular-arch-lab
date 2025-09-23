// import { inject, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class JourneyService {
//   private readonly http = inject(HttpClient);

//   getAllJourneys(): Observable<string[]> {
//     return this.http.get<string[]>('');
//   }

//   getJourneyById(id: number): Observable<string> {
//     return this.http.get<string>(`${''}/${id}`);
//   }
// }

// export function setupJourneyServiceMock(): {
//   journeyServiceMock: jasmine.SpyObj<JourneyService>;
// } {
//   const journeyServiceMock = jasmine.createSpyObj<JourneyService>('JourneyService', [
//     'getAllJourneys',
//     'getJourneyById',
//   ]);

//   return { journeyServiceMock };
// }
