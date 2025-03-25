class FactionSheet extends JournalSheet {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      template: "modules/bitd-faction-sheet/templates/faction-sheet.html",
      classes: ["bitd", "faction-sheet", "sheet"],
      width: 800,
      height: 600,
      resizable: true,
    });
  }

  getData() {
    const data = super.getData();
    data.factions = this.object.data.flags["bitd-faction"] || {
      underworld: [],
      politics: [],
      industry: [],
      strange: [],
      labor: []
    };
    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);
    html.find(".faction-input").change(this._updateFaction.bind(this));
  }

  async _updateFaction(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const category = element.dataset.category;
    const index = element.dataset.index;
    const field = element.dataset.field;
    const value = element.value;
    
    let factions = this.object.getFlag("bitd-faction", category) || [];
    factions[index] = factions[index] || {};
    factions[index][field] = value;
    
    await this.object.setFlag("bitd-faction", category, factions);
  }
}

Hooks.once("init", () => {
  Journal.registerSheet("bitd", FactionSheet, { makeDefault: false });
});
