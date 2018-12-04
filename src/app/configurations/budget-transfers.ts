export const config = {
  "kinds": [
    {
      "doctype": "budget",
      "filters": {
        "depth__gt": 0,
        "year": 2019
      },
      "placeholder": "חיפוש תכנית תקציבית (למשל ״20.43.01״ או ״העברות לרשויות״)",
      "result_template": "{{{nice-code}}} - {{{title}}}",
      "title": "תכניות תקציביות",
      "visualisations": [
        {
          "kind": "table",
          "query": "select  year as \"שנה:str\", net_allocated as \"תקציב מקורי:fig\", net_revised as \"תקציב מאושר:fig\", (net_revised / net_allocated - 1) * 100 as \"שינוי באחוזים:fig\", net_executed as \"ביצוע:fig\", (net_executed / net_revised ) * 100 as \"אחוז ביצוע תקציב:fig\" from raw_budget where code=':code' order by year desc\n",
          "title": "היסטוריה תקציבית"
        },
        {
          "kind": "table",
          "query": "select  coalesce(to_char(\"date\", 'YYYY/MM/DD'), 'טרם אושר') as \"תאריך:str\", change_title as \"סוג:str\", req_title as \"כותרת:strw\", net_expense_diff as \"נטו:fig\", gross_expense_diff as \"ברוטו:fig\", allocated_income_diff as \"הכנסה מיועדת:fig\", commitment_limit_diff as \"הרשאה להתחייב:fig\", personnel_max_diff as \"שיא כ״א:fig\" from raw_budget_changes where budget_code=':code' and year>=2015 order by date desc\n",
          "title": "העברות בשנים האחרונות"
        },
        {
          "kind": "table",
          "query": "SELECT coalesce(entity_name, recipient) AS \"מקבל התמיכה:str\",\n      min(year_requested) as \"משנת:str\",\n      max(year_paid) as \"עד שנת:str\",\n      sum(amount_paid) as \"סך שולם:fig\",\n      sum(amount_total) as \"סך אושר:fig\"\nFROM raw_supports WHERE budget_code LIKE ':code%%' GROUP BY 1 HAVING sum(amount_paid)>0 ORDER BY 4 DESC nulls LAST LIMIT 20\n",
          "title": "נתמכים עיקריים"
        },
        {
          "kind": "table",
          "query": "SELECT support_title AS \"נושא התמיכה:str\",\n      min(year_requested) as \"משנת:str\",\n      max(year_paid) as \"עד שנת:str\",\n      sum(amount_paid) as \"סך שולם:fig\",\n      sum(amount_total) as \"סך אושר:fig\"\nFROM raw_supports WHERE budget_code LIKE ':code%%' GROUP BY 1 HAVING sum(amount_paid)>0 ORDER BY 4 DESC nulls LAST LIMIT 20\n",
          "title": "נושאי תמיכה עיקריים"
        },
        {
          "kind": "table",
          "query": "SELECT coalesce(entity_name, supplier_name->>0) AS \"ספק:str\",\n      min(min_year) as \"משנת:str\",\n      max(max_year) as \"עד שנת:str\",\n      sum(executed) as \"סך שולם:fig\",\n      sum(volume) as \"סך אושר:fig\"\nFROM contract_spending WHERE budget_code LIKE ':code%%' GROUP BY 1 ORDER BY 4 DESC nulls LAST LIMIT 20\n",
          "title": "ספקים עיקריים"
        },
        {
          "kind": "table",
          "query": "SELECT coalesce(entity_name, supplier_name->>0) AS \"ספק:str\",\n      purpose as \"מטרה:strw\",\n      budget_title as \"מתקציב:strw\",\n      purchasing_unit as \"המזמין:str\",\n      purchase_method as \"אופן רכישה:strw\",\n      min_year as \"משנת:str\",\n      executed as \"סך שולם עד כה:fig\",\n      volume as \"היקף ההתקשרות:fig\"\nFROM contract_spending WHERE budget_code LIKE ':code%%' ORDER BY 7 DESC nulls LAST LIMIT 20\n",
          "title": "התקשרויות מרכזיות"
        }
      ]
    }
  ]
};