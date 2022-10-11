export type reference = {
  id: string,
  url: string,
  createdAt: number,
};

export type result = {
  id: string,
  referenceId: string,
  data: pageData,
  createdAt: number,
}

export type pageData = {
  title: string,
  meta: {
    name: string,
    content: string,
  }[]
}