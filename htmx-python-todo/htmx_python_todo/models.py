from dataclasses import dataclass, field


@dataclass(frozen=True)
class TodoItem:
    title: str
    completed: bool = field(default=False)
    itemId: int = field(default=None)
