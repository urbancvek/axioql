// @flow
import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';

const TYPENAME_FIELD = {
  kind: 'Field',
  alias: null,
  name: {
    kind: 'Name',
    value: '__typename',
  },
};

const addTypenameToSelectionSet = (selectionSet, isRoot = false) => {
  if (selectionSet && selectionSet.selections) {
    if (!isRoot) {
      const alreadyHasThisField = selectionSet.selections.some((selection) =>
        selection.kind === 'Field' && selection.name.value === '__typename'
      );

      if (!alreadyHasThisField) {
        selectionSet.selections.push(TYPENAME_FIELD);
      }
    }

    selectionSet.selections.forEach((selection) => {
      if (selection.kind === 'Field' || selection.kind === 'InlineFragment') {
        addTypenameToSelectionSet(selection.selectionSet);
      }
    });
  }
};

const addTypenameToDocument = (doc) => {
  doc.definitions.forEach((definition) => {
    const isRoot = definition.kind === 'OperationDefinition';
    addTypenameToSelectionSet(definition.selectionSet, isRoot);
  });

  return doc;
};

const modifyQuery = (query: string) => {
  const newQuery = print(addTypenameToDocument(gql`${query}`));

  return newQuery;
};

export { modifyQuery };
