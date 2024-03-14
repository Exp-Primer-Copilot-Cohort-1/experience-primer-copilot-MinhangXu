function skillsMember() {
  return {
    skills: ['React', 'Redux', 'Node', 'Express', 'MongoDB', 'Jest', 'Enzyme'],
    getSkills: function() {
      return this.skills;
    }
  };
}