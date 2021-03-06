import requests
from bs4 import BeautifulSoup

LIMIT = 50
URL = f"https://kr.indeed.com/%EC%B7%A8%EC%97%85?as_and=python&as_phr=&as_any=&as_not=&as_ttl=&as_cmp=&jt=all&st=&as_src=&radius=25&l=&fromage=any&limit={LIMIT}&sort=&psf=advsrch&from=advancedsearch"

def get_last_page():
  result = requests.get(URL)

  soup = BeautifulSoup(result.text, "html.parser")

  pagination = soup.find("div", {"class": "pagination"})

  links = pagination.find_all('a')

  pages = []

  for link in links[:-1]:
    pages.append(int(link.string))

  max_page = pages[-1]
  return max_page

def extract_job(html) :
    title = html.find("h2", {"class" : "title"}).find("a")["title"]
    company = html.find("span", {"class" : "company"})
    if company :
      company_anchor = company.find("a")
      if company_anchor is not None :
        company = str(company.find("a").string)
      else :
        company = str(company.string)
      company = company.strip()
    else :
       company = None
    location = html.find("div", {"class" : "recJobLoc"})["data-rc-loc"]
    job_id = html["data-jk"]
    return {
      'title' : title, 
      'company' : company, "location" : location, 
      "link" : f"https://kr.indeed.com/%EC%B1%84%EC%9A%A9%EB%B3%B4%EA%B8%B0?cmp=Bepro-Company&t=Frontend+Developer&jk={job_id}&sjdu=q7yxxeHj5IC7xEw8iiZPOvqrOyNp5Ca64GLYvYu5pCmkYovfKYpuig3oeKEc_-oL6UFVzjNLJruSiqbsXo_Pz7kQcm6LRT0v28lNCaiyzLc&tk=1edj3tkhk0ukc001&adid=344383299&vjs=3"
    }

def extract_jobs(last_pages):
  jobs = []
  for page in range(last_pages):
    print(f"Scrapping Indeed: page: {page}")
    result = requests.get(f"{URL}&start={page*LIMIT}")
    soup = BeautifulSoup(result.text, "html.parser")
    results = soup.find_all("div", {"class" : "jobsearch-SerpJobCard"})
    for result in results :
      job = extract_job(result)
      jobs.append(job)
  return jobs


def get_jobs() : 
  last_page = get_last_page()
  jobs = extract_jobs(last_page)
  return jobs
