using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreReact.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoreReact.Controllers.API
{
    [Produces("application/json")]
    [Route("api/Skills")]
    public class SkillsController : Controller
    {
        private static List<Skill> skills;
        public SkillsController()
        {
            if (skills != null) return;
            skills = new List<Skill>
            {
                new Skill
                {
                    Id = 1,
                    Name = "Skill 1",
                    ShortName = "S1",
                    ForeColor = "#0000ff",
                    Category = "Cat1",
                    Active = true,
                    Email="em1@gmail.com",
                    Length = 12,
                    Percentage= 2.5,
                    StartDate = DateTime.Now,
                    StartTime = 3.5,
                    CalculationType = CalculationType.Simple
                },
                new Skill
                {
                    Id = 2,
                    Name = "Skill 2",
                    ShortName = "S2",
                    ForeColor = "#00ff00",
                    Category = "Cat1",
                    Active = false,
                    Email="em2@gmail.com",
                    Length = 12,
                    Percentage= 92.37,
                    StartDate = DateTime.Now.AddMonths(-1),
                    StartTime = 12.5,
                    CalculationType = CalculationType.Complex
                },
                new Skill
                {
                    Id = 3,
                    Name = "Skill 3",
                    ShortName = "S3",
                    ForeColor = "#ff0000",
                    Category = "Cat2",
                    Active = true,
                    Email="em3@gmail.com",
                    Length = 12,
                    Percentage= 43.7,
                    StartDate = DateTime.Now.AddDays(1),
                    StartTime = 22.5,
                    CalculationType = CalculationType.Simple
                }
            };
        }
        [HttpGet]
        public IEnumerable<Skill> Get()
        {
            System.Threading.Thread.Sleep(4000);
            return skills;
        }

        [HttpGet("{id}", Name = "Get")]
        public Skill Get(int id)
        {
            System.Threading.Thread.Sleep(6000);
            return skills.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public Skill Post([FromBody]Skill value)
        {
            if(skills.Any(x => x.Id == value.Id))
            {
                throw new Exception();
            }
            int id = skills.Max(x => x.Id) + 1;
            value.Id = id;
            skills.Add(value);
            System.Threading.Thread.Sleep(7000);
            return value;
        }

        [HttpPut("{id}")]
        public Skill Put(int id, [FromBody]Skill value)
        {
            var skill = skills.FirstOrDefault(x => x.Id == value.Id);
            if (skill == null)
            {
                throw new Exception();
            }
            skills.Remove(skill);
            skills.Add(value);
            System.Threading.Thread.Sleep(7000);
            return value;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var skill = skills.FirstOrDefault(x => x.Id == id);
            if (skill == null)
            {
                throw new Exception();
            }
            System.Threading.Thread.Sleep(7000);
            skills.Remove(skill);
        }
    }
}