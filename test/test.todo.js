const Todo = artifacts.require("Todo");

contract("deploy", (accounts) => {
  let todoContract = null;
  before(async () => {
    todoContract = await Todo.new();
  });

  it("Should deploy contract successfully", async () => {
    assert.notEqual(todoContract.address, 0x00);
    assert.notEqual(todoContract.address, "");
    assert.notEqual(todoContract.address, undefined);
    assert.notEqual(todoContract.address, null);
  });
  it("Should create a new todo", async () => {
    await todoContract.createTodo(
      "Learn solidity",
      "Learn solidity from zero to ninja"
    );
    const count = await todoContract.getTodoCount();
    assert.equal(count, 1);
  });

  it("Should fetch all todos", async () => {
    const allTodos = await todoContract.getAllTodos();
    assert.notEqual(allTodos, null);
  });

  it("Should update a todo", async () => {
    const title = "Master solidity";
    const description = "Master this language and get a job";
    const complete = true;
    const response = await todoContract.updateTodo(
      0,
      title,
      description,
      complete
    );
    const updatedTodo = response.logs[0].args;
    assert.equal(updatedTodo.title, title);
  });

  it("Should fail to update a todo", async () => {
    const title = "Master solidity";
    const description = "Master this language and get a job";
    const complete = true;
    await todoContract.updateTodo(0, title, description, complete, {
      from: accounts[2],
    });
    const todo = await todoContract.getTodo(0);
    assert.notEqual(todo.title, title);
  });
  it("Should delete a todo", async () => {
    const res = await todoContract.deleteTodo(1);
    const count = await todoContract.getTodoCount();
    console.log(res.logs[0]);
    assert.equal(count, 1);
  });
});
