<script setup lang="ts">
const rows = []
for (let index = 0; index < 20; index++) {
  rows[index] = index
}
</script>

<template>
  <div className="overflow-x-scroll h-full">
    <table className="table">
      <thead class="text-white">
        <tr>
          <th>#</th>
          <th>Club</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GD</th>
          <th>PTS</th>
        </tr>
      </thead>
      <tbody class="text-white">
        <tr
          v-for="row in rows"
          :key="row"
          class="odd:bg-base-300/10 hover:text-secondary odd:hover:bg-white even:hover:bg-primary-content"
        >
          <th>1</th>
          <td>Manchester United</td>
          <td>38</td>
          <td>38</td>
          <td>38</td>
          <td>38</td>
          <td>-100</td>
          <td>114</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
