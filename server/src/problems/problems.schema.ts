import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  Difficulty,
  SampleCase,
  InputType,
  SubmitCase,
  InputEnum,
} from '@Types/problem';

@Schema()
export class Problem {
  @Prop({
    required: true,
    type: String,
    trim: true,
    unique: true,
    minlength: 1,
    maxlength: 60,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
    trim: true,
    enum: Object.values(Difficulty),
  })
  difficulty: Difficulty;

  @Prop({ required: true, type: String })
  markdown: string;

  @Prop({
    type: [
      {
        input: {
          type: [
            {
              input: { type: String, trim: true, required: true },
              type: {
                type: String,
                enum: Object.values(InputEnum),
                required: true,
              },
            },
          ],
        },
        output: {
          type: [
            {
              type: String,
              trim: true,
              required: true,
            },
          ],
        },
      },
    ],
  })
  sampleCases: SampleCase;

  // @Prop(() => [
  //   {
  //     input: [
  //       {
  //         type: String,
  //         trim: true,
  //         required: true,
  //       },
  //     ],
  //     output: [
  //       {
  //         type: String,
  //         trim: true,
  //         required: true,
  //       },
  //     ],
  //   },
  // ])
  // submitCases: SubmitCase[];

  // @Prop([
  //   {
  //     input: { type: String, required: true },
  //     type: {
  //       type: String,
  //       enum: Object.values(InputEnum),
  //       required: true,
  //     },
  //   },
  // ])
  // inputs: InputType[];
}

export type ProblemDocument = Problem & Document;

export const ProblemSchema = SchemaFactory.createForClass(Problem);
