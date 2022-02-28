type Note = {
  id: string | number;
  text: string;
  createdAt: number | string | Date;
  deleted: boolean;
};

export default Note;
