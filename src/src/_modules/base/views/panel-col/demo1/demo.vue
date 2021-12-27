<template>
  <div>
    <em-panel-row height="400px">
      <em-panel-col :span="12">
        <em-panel header title="面板1" icon="chrome"></em-panel>
      </em-panel-col>
      <em-panel-col :span="12">
        <em-panel header title="面板2" icon="chrome"></em-panel>
      </em-panel-col>
    </em-panel-row>
    <em-panel-row height="400px">
      <em-panel-col :span="6" :offset="2">
        <em-panel header title="面板3" icon="chrome"></em-panel>
      </em-panel-col>
      <em-panel-col :span="6">
        <em-panel header title="面板4" icon="chrome"></em-panel>
      </em-panel-col>
      <em-panel-col :span="6">
        <em-panel header title="面板5" icon="chrome"></em-panel>
      </em-panel-col>
    </em-panel-row>
  </div>
</template>

