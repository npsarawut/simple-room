import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../core/data.service";
import { ActivatedRoute } from "@angular/router";

interface Cost {
  id?: string;
  type?: string;
  name?: string;
  base?: string;
}

@Component({
  selector: "app-edit-cost",
  templateUrl: "./edit-cost.component.html",
  styleUrls: ["./edit-cost.component.css"]
})
export class EditCostComponent implements OnInit {
  id;
  mode;
  cost: Cost = {};

  constructor(private data: DataService, private router: ActivatedRoute) {
    this.mode = router.snapshot.url[1].path == "edit" ? "edit" : "add";
    if (this.mode == "edit") this.id = router.snapshot.params.id;
  }

  ngOnInit() {
    if (this.mode == "edit") {
      this.data.getCostDetail(this.id).subscribe(res => {
        this.cost = res;
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let { type, name, base } = this.cost;
    if (!type || !name || !base) {
      return;
    }
    if (this.mode == "add") {
      this.addDetail();
    } else {
      this.updateDetail();
    }
  }

  addDetail() {
    event.preventDefault();
    let { type, name, base } = this.cost;
    this.data.addCostDetail({ type, name, base: parseFloat(base) });
  }

  updateDetail() {
    event.preventDefault();
    let { type, name, base } = this.cost;
    this.data.updateCostDetail(this.id, {
      type,
      name,
      base: parseFloat(base)
    });
  }
}
