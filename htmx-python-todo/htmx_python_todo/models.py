class TodoItem:
    def __init__(self, title: str, completed: bool = False):
        self.title = title
        self.completed = completed

    def __repr__(self):
        return f"<TodoItem: {self.title} ({self.completed})>"