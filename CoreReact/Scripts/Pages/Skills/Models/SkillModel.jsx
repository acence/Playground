class SkillModel {
    constructor(skill) {
        if (!skill) {
            this.id = 0;
            this.name = '';
            this.shortName = '';
            this.foreColor = '';
            this.category = '';
            this.active = false;
            this.email = '';
            this.startDate = new Date();
            this.startTime = 0;
            this.length = 0;
            this.percentage = 0;
            this.calculationType = 0;
        } else {
            this.id = skill.id;
            this.name = skill.name;
            this.shortName = skill.shortName;
            this.foreColor = skill.foreColor;
            this.category = skill.category;
            this.active = skill.active;
            this.email = skill.email;
            this.startDate = skill.startDate;
            this.startTime = skill.startTime;
            this.length = skill.length;
            this.percentage = skill.percentage;
            this.calculationType = skill.calculationType;
        }
    }

    static get Identifier() {
        return 'id';
    }

    static transformList(skills) {
        let transformed = [];
        for (var skill of skills) {
            transformed.push(new SkillModel(skill));
        }
        return transformed;
    }
}

export default SkillModel;