<template>
  <section class="act-container">
    
        <div class="row mb-4">
          <div class="col">
            <h3>Activities</h3>
          </div>
          <div class="col">
            <select id="filter" class="form-control">
              <option value="today">today</option>
            </select>
          </div>
          <div class="col"></div>
        </div>
        <div class="row">
          <div class="col-12">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
     
  </section>
</template>

<script>
export default {
  name: "activities-section"
};
</script>

<style>
.act-container{
  margin: 30px;
  padding: 30px;
  background-color: #fff;
  width: 90%;
}
</style>
