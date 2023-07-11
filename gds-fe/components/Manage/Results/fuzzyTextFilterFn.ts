import { matchSorter } from "match-sorter";

function fuzzyTextFilterFn(
  rows: { values: string[] }[],
  id: number,
  filterValue: string
) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

fuzzyTextFilterFn.autoRemove = (val: string) => !val;

export { fuzzyTextFilterFn };
