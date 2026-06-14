type Message = { role: 'user' | 'assistant'; content: string };

const conversations = new Map<string, Message[]>();

const conversationRepository = {
   get(conversationId: string): Message[] {
      if (!conversations.has(conversationId)) {
         conversations.set(conversationId, []);
      }
      return conversations.get(conversationId)!;
   },

   set(conversationId: string, history: Message[]): void {
      conversations.set(conversationId, history);
   },

   delete(conversationId: string): void {
      conversations.delete(conversationId);
   },

   has(conversationId: string): boolean {
      return conversations.has(conversationId);
   },
};

export default conversationRepository;
