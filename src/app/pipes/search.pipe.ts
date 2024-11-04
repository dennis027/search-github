import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(repositories: any[], searchTerm: string): any[] {
    if (!repositories || !searchTerm) {
      return repositories;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    return repositories.filter(repo => {
      const matchesName = repo.name.toLowerCase().includes(lowerCaseTerm);
      const matchesFullName = repo.full_name.toLowerCase().includes(lowerCaseTerm);
      const matchesDescription = repo.description && repo.description.toLowerCase().includes(lowerCaseTerm);
      const matchesLanguage = repo.language && repo.language.toLowerCase().includes(lowerCaseTerm);


      return matchesName || matchesFullName || matchesDescription || matchesLanguage;
    });
  }
}