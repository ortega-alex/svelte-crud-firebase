<script>
  import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
  import { onDestroy } from "svelte";
  import Toastify from "toastify-js";
  import { db } from "./firebase";

  let task = {
    title: "",
    desription: "",
  };
  let tasks = [];
  let currentId = "";
  let editStatus = false;

  const resetData = () => {
    task = {};
    currentId = "";
    editStatus = false;
  };

  const addTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), task);
      resetData();
      Toastify({
        text: "new task created",
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      await updateDoc(doc(db, "tasks", currentId), task);
      resetData();
      Toastify({
        text: "updated task",
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (editStatus) updateTask();
      else addTask();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      Toastify({
        text: "task deleted",
      }).showToast();
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = async (currentTask) => {
    currentId = currentTask.id;
    task.title = currentTask.title;
    task.desription = currentTask.desription;
    editStatus = true;
  };

  const unsub = onSnapshot(
    collection(db, "tasks"),
    (querySnapshot) => {
      tasks = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    (err) => console.error(err)
  );

  onDestroy(unsub);
</script>

<main>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6">
        <form
          on:submit|preventDefault={handleSubmit}
          class="card card-body p-5"
        >
          <div class="mb-3">
            <label class="text-secondary fs-5" for="title">Title</label>
            <input
              bind:value={task.title}
              type="text"
              class="form-control"
              placeholder="Write a title"
            />
          </div>
          <div class="mb-3">
            <label class="text-secondary fs-5" for="title">Description</label>
            <textarea
              bind:value={task.desription}
              type="text"
              id="description"
              class="form-control"
              rows="3"
              placeholder="Write a description"
            />
          </div>
          <button class="btn btn-primary">save</button>
        </form>
      </div>
      <div class="col-md-6">
        {#each tasks as task}
          <div class="card card-body mt-2">
            <div class="d-flex justify-content-between">
              <h5>{task.title}</h5>
              <button on:click={editTask(task)} class="btn btn-text">
                <i class="material-icons">edit</i>
              </button>
            </div>
            <p>{task.desription}</p>
            <div>
              <button on:click={deleteTask(task.id)} class="btn btn-danger">
                <i class="material-icons" style="vertical-align: middle;"
                  >delete_forever</i
                > Delete
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>

<style>
</style>
