function deleteJob(id) {
  const result = confirm("are you sure you want to delete this Job?");
  if (result) {
    fetch("/deleteJob/" + id, { method: "POST" }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}
