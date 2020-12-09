import Joi from '@hapi/joi';
import { JoiValidator } from '@app/data/utils';

export const isTask = Joi.object({
  description: JoiValidator.validateString().required(),
  state: Joi.allow(["todo", "done"]).default("todo"),
});

export const isID = Joi.object({
  id: JoiValidator.validateID()
});
