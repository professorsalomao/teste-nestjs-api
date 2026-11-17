import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá alunos!';
  }

  getCidi(): string {
    return 'Implementado CI/CD';
  }
}
