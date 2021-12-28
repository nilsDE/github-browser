export interface Repository {
    id: number;
    description: string;
    name: string;
    url: string;
    owner: {
      avatar_url: string;
      login: string;
    }
  }
