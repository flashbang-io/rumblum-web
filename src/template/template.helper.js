import changeCase from 'change-case';

export const tagsToInputs = (tags = []) => tags.filter(({ type }) => ['string', 'text', 'open', 'negated'].indexOf(type) >= 0)
  .map((tag) => ({
    ...tag,
    type: tag.type === 'string' ? 'text' : tag.type === 'text' ? 'textarea' : 'checkbox',
    title: changeCase.titleCase(tag.name),
  }));

export const noop = () => {};
