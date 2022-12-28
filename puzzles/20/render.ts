import { NumberWrapper } from "./index";

const renderWrapper = (subject: NumberWrapper): string =>
  `(${subject.previous.value} < ${subject.value} > ${subject.next.value})`;

const renderLinkedList = (head: NumberWrapper): string => {
  const result: string[] = [];
  let current = head;
  while (true) {
    result.push(
      `${current.previous.value} -> ${current.value} -> ${current.next.value}`
    );
    current = current.next;
    if (current === head) {
      break;
    }
    if (result.length > 20) {
      break;
    }
  }
  return result.join(" | ");
};

export { renderLinkedList };
