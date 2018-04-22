using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoreReact.Models
{
    public enum CalculationType
    {
        Simple = 1,
        Complex = 2
    }
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string ForeColor { get; set; }
        public string Category { get; set; }
        public bool Active { get; set; }
        public string Email { get; set; }
        public DateTime StartDate { get; set; }
        public double StartTime { get; set; }
        public int Length { get; set; }
        public double Percentage { get; set; }
        public CalculationType CalculationType { get; set; }
    }
}
