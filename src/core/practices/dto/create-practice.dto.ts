export class CreatePracticeDto {
  name: string;

  description?: string;

  studyCondition: string;

  selectionConditions: string;

  vacanciesCount: number;

  specialization: string;

  directionId: number;
}
