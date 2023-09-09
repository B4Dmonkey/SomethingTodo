from fastapi import FastAPI
app = FastAPI()


@app.get("/")
def main():
    return {"message": "Hey, It is me hey"}
