import { PartialType } from '@nestjs/mapped-types';
import { CreatePracticeRequestDto } from './create-practice-request.dto';

export class UpdatePracticeRequestDto extends PartialType(CreatePracticeRequestDto) {}
