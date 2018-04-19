using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReact.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string ForeColor { get; set; }
        public string BackColor { get; set; }
        public string Category { get; set; }
        public bool Active { get; set; }
    }
}
