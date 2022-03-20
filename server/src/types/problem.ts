import { Input } from '@/problems/entities/problem.entity';

export enum InputEnum {
  String = 'string',
  Integer = 'integer',
  Float = 'float',
  Double = 'double',
  Char = 'char',
  StringArray = 'string[]',
  IntegerArray = 'integer[]',
  FloatArray = 'float[]',
  DoubleArray = 'double[]',
  CharArray = 'char[]',
}

export interface InputType {
  input: string;
  inputType: InputEnum;
}

export interface SampleCase {
  inputs: Input[];
  outputs: string[];
}

export interface SubmitCase {
  input: string[];
  output: string[];
}

export enum Difficulty {
  easy = 'easy',
  medium = 'medium',
  hard = 'hard',
}
