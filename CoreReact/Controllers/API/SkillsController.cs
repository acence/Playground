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
        private List<Skill> skills;
        public SkillsController()
        {
            skills = new List<Skill>
            {
                new Skill
                {
                    Id = 1,
                    Name = "Skill 1",
                    ShortName = "S1",
                    ForeColor = "#ffffff",
                    BackColor = "#000000",
                    Category = "Cat1",
                    Active = true
                },
                new Skill
                {
                    Id = 2,
                    Name = "Skill 2",
                    ShortName = "S2",
                    ForeColor = "#ffffff",
                    BackColor = "#000000",
                    Category = "Cat1",
                    Active = false
                },
                new Skill
                {
                    Id = 3,
                    Name = "Skill 3",
                    ShortName = "S3",
                    ForeColor = "#ffffff",
                    BackColor = "#000000",
                    Category = "Cat2",
                    Active = true
                }
            };
        }
        [HttpGet]
        public IEnumerable<Skill> Get()
        {
            return skills;
        }

        [HttpGet("{id}", Name = "Get")]
        public Skill Get(int id)
        {
            return skills.FirstOrDefault(x => x.Id == id);
        }

        [HttpPost]
        public void Post([FromBody]Skill value)
        {
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Skill value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}