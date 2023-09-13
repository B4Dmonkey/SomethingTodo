class TodoItem: # ? Its been a while since I've used python but a named tuple might be better ? 
    def __init__(self, title: str, completed: bool = False,itemId:int=None):
        self.title = title
        self.completed = completed
        self.itemId = itemId

    def __repr__(self):
        return f"<TodoItem: {self.title} ({self.completed})>"