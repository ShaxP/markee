export default interface MdDoc {
  id: string;
  archived: boolean;
  todo: boolean;
  tags: string[];
  modified: Date;
  title: string;
  content: string;
}
