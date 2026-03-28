export type Message = {
  id: number;
  sender: 'me' | 'ysf';
  text: string;
  time: string;
};

const landingData: Message[] = [
  {
    id: 1,
    sender: 'ysf',
    text: 'pushed the backend routes, check the auth middleware',
    time: '2:41 PM',
  },
  {
    id: 2,
    sender: 'me',
    text: 'just pulled, looks clean merging now',
    time: '2:42 PM',
  },
  {
    id: 3,
    sender: 'ysf',
    text: "nice, what's the status?",
    time: '2:43 PM',
  },
  {
    id: 4,
    sender: 'me',
    text: 'all good here',
    time: '2:46 PM',
  },
  {
    id: 5,
    sender: 'ysf',
    text: 'then deploy it',
    time: '2:50 PM',
  },
];

export default landingData;