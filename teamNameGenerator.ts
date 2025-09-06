import { faker } from '@faker-js/faker';

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const generateTeamName = (): string => {
  const adjective = capitalize(faker.word.adjective());
  // To get more creative names, let's use a broader category
  const animal = capitalize(faker.animal.type());
  return `${adjective} ${animal}`;
};

export const generateUserNickname = (): string => {
    const adjective = capitalize(faker.word.adjective());
    const animal = capitalize(faker.animal.bird());
    return `${adjective} ${animal}`;
};

export const generateTeamNameSuggestions = (count: number = 4): string[] => {
  const suggestions = new Set<string>();
  // Ensure we don't get duplicates
  while (suggestions.size < count) {
    suggestions.add(generateTeamName());
  }
  return Array.from(suggestions);
};

export const getAvatarInitials = (name: string): string => {
  const parts = name.split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};
